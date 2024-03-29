{ pkgs ? import <nixpkgs> {} }:

let
  fhs = pkgs.buildFHSUserEnv {
    name = "fiedka";
    targetPkgs = pkgs: with pkgs; [
      # Copied from another Electron application. Probably doesn't need everything
      bash
      coreutils
      zlib
      stdenv.cc.cc
      xorg.libXext
      xorg.libX11
      xorg.libXrender
      xorg.libXtst
      xorg.libXi
      xorg.libXft
      xorg.libxcb
      # common requirements
      freetype
      fontconfig
      glib
      gtk2
      gtk3

      nodejs
      go_1_17
      git
      #electron

      # Manually added
      xorg.libxshmfence
      nss
      nspr
      atk
      at-spi2-atk
      dbus
      libdrm
      libxkbcommon
      alsa-lib
      shared-mime-info

      # Copied from atom
      stdenv.cc.cc zlib glib dbus gtk3 atk pango freetype libgnome-keyring3
      fontconfig gdk-pixbuf cairo cups expat nspr nss
      xorg.libXrender xorg.libX11 xorg.libXext xorg.libXdamage xorg.libXtst
      xorg.libXcomposite xorg.libXi xorg.libXfixes xorg.libXrandr
      xorg.libXcursor xorg.libxkbfile xorg.libXScrnSaver libcap systemd libnotify
      xorg.libxcb libsecret libuuid at-spi2-atk at-spi2-core libdbusmenu
      libdrm
      mesa # for libgbm
      # Not found
    ];
    multiPkgs = null;
    # Set up path for GTK, otherwise is crashes when using buttons
    profile = with pkgs; ''
      export XDG_DATA_DIRS=/usr/share/:${gsettings-desktop-schemas}/share/gsettings-schemas/${gsettings-desktop-schemas.name}:${gtk3}/share/gsettings-schemas/${gtk3.name}:$XDG_DATA_DIRS
      # TODO: Make sure this works with newer/older versions
      export GDK_PIXBUF_MODULE_FILE="${librsvg.out}/lib/gdk-pixbuf-2.0/2.10.0/loaders.cache"
    '';
  };
in fhs.env
