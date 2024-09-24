extern crate wasm_bindgen;

use gloo_utils::format::JsValueSerdeExt;
use me_fs_rs::ME_FPT;
use romulan::amd;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;

mod utils;

const OFFSET_ADDR_MASK: u32 = 0x00FF_FFFF;

type Bin = Vec<u8>;

#[derive(Serialize, Deserialize)]
struct BiosDirEntry {
    entry: amd::directory::BiosDirectoryEntry,
    descr: String,
}

#[derive(Serialize, Deserialize)]
struct BiosDir {
    family: String,
    header: amd::directory::DirectoryHeader,
    entries: Vec<BiosDirEntry>,
}

#[derive(Serialize, Deserialize)]
struct Res {
    efs: amd::flash::EFS,
    size: u32,
    dirs: Vec<BiosDir>,
    err: String,
}

fn parse_bios_dir(bin: &[u8], family: String) -> BiosDir {
    let dir = amd::directory::BiosDirectory::new(bin);
    let d = dir.unwrap();
    let header = d.header();
    let entries = d
        .entries()
        .iter()
        .map(|e| BiosDirEntry {
            entry: *e,
            descr: e.description().to_string(),
        })
        .collect::<Vec<BiosDirEntry>>();
    BiosDir {
        family,
        header,
        entries,
    }
}

const FAM17_MODEL00_0F: &str = "Family 17 Model 00-0f";
const FAM17_MODEL10_1F: &str = "Family 17 Model 10-1f";
const NO_ENTRY: [u32; 2] = [0, 0xFFFF_FFFF];
const BIOS_DIR_LVL2_ENTRY: u8 = 0x70;

#[derive(Serialize, Deserialize)]
struct MeRes {
    size: u32,
    fpt: ME_FPT,
    err: String,
}

#[derive(Serialize, Deserialize)]
struct ErrRes {
    size: u32,
    err: String,
}

#[wasm_bindgen]
pub async fn mefs(data: JsValue) -> js_sys::Promise {
    utils::set_panic_hook();

    let bin: Bin = data.into_serde().unwrap();
    println!("ME FS 🦀");

    match me_fs_rs::parse(&bin) {
        Ok(fpt) => {
            let err = String::new();

            let res = MeRes {
                size: bin.len() as u32,
                fpt,
                err,
            };
            let res_val = JsValue::from_serde(&res).unwrap();
            js_sys::Promise::resolve(&res_val)
        }
        Err(err) => {
            let res = ErrRes {
                size: bin.len() as u32,
                err,
            };
            let res_val = JsValue::from_serde(&res).unwrap();
            js_sys::Promise::resolve(&res_val)
        }
    }
}

#[wasm_bindgen]
pub async fn romulan(data: JsValue) -> js_sys::Promise {
    utils::set_panic_hook();

    let bin: Bin = data.into_serde().unwrap();
    let rom = amd::Rom::new(&bin).unwrap();
    let efs = rom.efs();

    println!("Romulan 🦀");

    let mut dirs: Vec<BiosDir> = Vec::new();

    let e = efs.bios_17_00_0f;
    if !NO_ENTRY.contains(&e) {
        let offset = (efs.bios_17_00_0f & OFFSET_ADDR_MASK) as usize;
        let family = FAM17_MODEL00_0F.to_string();
        let bd = parse_bios_dir(&bin[offset..], family.clone());
        if let Some(e) = bd
            .entries
            .iter()
            .find(|e| e.entry.kind == BIOS_DIR_LVL2_ENTRY)
        {
            let offset = (e.entry.source as u32 & OFFSET_ADDR_MASK) as usize;
            let bd = parse_bios_dir(&bin[offset..], family);
            dirs.push(bd);
        };
        dirs.push(bd);
    }

    /*
    match dir {
        Ok(_) => {}
        Err(e) => err = e,
    }
    */
    let e = efs.bios_17_10_1f;
    if !NO_ENTRY.contains(&e) {
        let offset = (efs.bios_17_10_1f & OFFSET_ADDR_MASK) as usize;
        let family = FAM17_MODEL10_1F.to_string();
        let bd = parse_bios_dir(&bin[offset..], family.clone());
        if let Some(e) = bd
            .entries
            .iter()
            .find(|e| e.entry.kind == BIOS_DIR_LVL2_ENTRY)
        {
            let offset = (e.entry.source as u32 & OFFSET_ADDR_MASK) as usize;
            let bd = parse_bios_dir(&bin[offset..], family);
            dirs.push(bd);
        };
        dirs.push(bd);
    }

    let err = String::new();

    let res = Res {
        efs,
        size: bin.len() as u32,
        dirs,
        err,
    };
    let res_val = JsValue::from_serde(&res).unwrap();
    js_sys::Promise::resolve(&res_val)
}
