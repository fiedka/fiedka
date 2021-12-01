{ pkgs ? import <nixpkgs> {} }:

let
  fhs = pkgs.buildFHSUserEnv {
    name = "fiedka";
    targetPkgs = pkgs: with pkgs; [
      nodejs
      go_1_17
      git

      # common requirements
      freetype
      fontconfig
      glib
      gtk2
      gtk3

      # Copied from another Electron application. Probably doesn't need everything
      bash
      coreutils
      zlib
      stdenv.cc.cc
      xorg.libXft

      # Copied from atom
      dbus
      atk
      at-spi2-atk
      at-spi2-core
      cairo
      pango
      libgnome-keyring3
      gdk-pixbuf
      cups
      expat
      nspr nss

      xorg.libXrender
      xorg.libX11
      xorg.libXext
      xorg.libXdamage
      xorg.libXtst
      xorg.libXcomposite
      xorg.libXi
      xorg.libXfixes
      xorg.libXrandr
      xorg.libXcursor
      xorg.libxkbfile
      xorg.libXScrnSaver
      xorg.libxcb

      libcap
      systemd
      libnotify
      libsecret
      libuuid
      libdbusmenu
      libdrm
      mesa # for libgbm

      # Manually added
      xorg.libxshmfence
      libxkbcommon
      alsa-lib
      shared-mime-info
    ];
    multiPkgs = null;
    # Set up path for GTK, otherwise is crashes when using file chooser
    profile = with pkgs; ''
      export XDG_DATA_DIRS=/usr/share/:${gsettings-desktop-schemas}/share/gsettings-schemas/${gsettings-desktop-schemas.name}:${gtk3}/share/gsettings-schemas/${gtk3.name}:$XDG_DATA_DIRS
      # TODO: Make sure this works with newer/older versions
      export GDK_PIXBUF_MODULE_FILE="${librsvg.out}/lib/gdk-pixbuf-2.0/2.10.0/loaders.cache"
    '';
  };
in fhs.env
