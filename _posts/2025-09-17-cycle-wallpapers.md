---
layout: default
title: Dual-Monitor Wallpaper Cycling on Linux Mint Cinnamon
description: A simple Bash script to rotate wallpapers per monitor using feh, xrandr, and cron.
categories: ["dev"]
date: 2025-09-17 11:15:13
---
One feature I’ve always appreciated on Windows is the built-in wallpaper slideshow. With just a few clicks, I could point it to a directory and have each monitor cycle through my favorite images.

I decided I wanted to try to recreate this functionality in Linux. After some manual searching and checking with a LLM (Copilot), I figured out a simple script to handle the work.

### Setup

I use Cinnamon desktop, which does allow a configurable slideshow, but I am locked in to one wallpaper on both monitors. I explored popular tools like Variety, Nitrogen, and HydraPaper, but none supported the per-monitor cycling I wanted. Either they applied the same wallpaper to all screens or lacked automation features.

I could have made the setup exactly the same as Windows, where both screens rotated through the same directory randomly, but since I have more granular control here, I decided to split my wallpapers into two directories. One contains all of my Legend of Zelda themed wallpapers, and the other contains all of the others I have accumulated over the years. I simply named these directories `Monitor1` and `Monitor2` and sorted the files into them.

A few different commands are necessary for this setup - `feh`, `xrandr`, and (optionally) `notify-send`. To install all of these:

`sudo apt install feh x11-xserver-utils libnotify-bin`

In order for the script to function, I needed to identify the names of my monitors. That is where xrandr comes in handy.

```sh
>> xrandr --query | grep " connected"
DP-0 connected primary 1920x1080+0+128 (normal left inverted right x axis y axis) 598mm x 336mm
DP-2 connected 2560x1440+1920+0 (normal left inverted right x axis y axis) 598mm x 336mm
```

From this output, you can see that I have two monitors labeled `DP-0` and `DP-2` connected, roughly the same size but with DP-2 having a higher resolution of 1440p. You can gather the list of your monitors the same way.

I also wanted to track the changes in a log, so I am going to be using my `~/logs` directory:

`mkdir -p ~/logs`

You can put your log file wherever you like, or remove the logging altogether. In addition, I wanted to send a notification each time the script executed.

### Creating the script

Once I had the directories of images I wanted to use and the names of the monitors, I was able to plug them in to this simple bash script:

`set-wallpapers.sh`
```sh
#!/bin/bash

# Monitor identifiers (from xrandr)
MON1="DP-0"
MON2="DP-2"

# Wallpaper directories
DIR1="$HOME/Pictures/Wallpapers/Monitor1"
DIR2="$HOME/Pictures/Wallpapers/Monitor2"

# Pick random images
IMG1=$(find "$DIR1" -type f \( -iname "*.jpg" -o -iname "*.png" \) | shuf -n 1)
IMG2=$(find "$DIR2" -type f \( -iname "*.jpg" -o -iname "*.png" \) | shuf -n 1)

# Apply wallpapers
feh --no-fehbg --bg-scale "$IMG1" "$IMG2"

# (Optional) Send a notification
notify-send "Wallpapers updated" "$(basename "$IMG1") and $(basename "$IMG2")"

# (Optional) Log the change
echo "$(date): $IMG1 | $IMG2" >> "$HOME/logs/wallpaper.log"
```

This can be easily altered for using one wallpaper directory, or extended for a larger setup of three monitors or more.

Make sure your script is executable, and place it somewhere convenient (I like to put my scripts in `~/bin`)

```sh
chmod +x ~/bin/set-wallpapers.sh
```

### Configure automations

Lastly, to make this script execute automatically, there are three things I added:
1. crontab entry
2. startup entry
3. system hotkey

#### Crontab

To edit your crontab, simply execute
`crontab -e`
If you haven't used this before, it might ask you to set your default editor (I like vim but nano or emacs are both acceptable)
At the bottom of the file, add this entry:

```sh
*/15 * * * * ~/bin/set-wallpapers.sh
```

This will execute every 15 minutes. You can adjust this as you like.

#### Startup

To set the wallpapers on startup, I used my desktop's GUI for startup applications.

| Super key -> Startup Applications -> '+' -> Custom command

From here you can enter a name and select the script in `~/bin` as your command to execute. I also added a startup delay of 10 seconds in this window, to make sure that Cinnamon has time to fully load before it sets the wallpaper.

#### System hotkey

To add a system hotkey, I also used my desktop's GUI.

|Super key -> Keyboard -> Shortcuts -> Add custom shortcut

Select the script again from `~/bin` and then click the keyboard bindings in the window - you can set up to 3 per command. I went with `Alt+W` but use whatever makes sense for your setup.

And with that, you can easily test the script anytime by pressing the shortcut you set! A notification should pop up and the images should rotate. If you set up startup and cron tasks, the same thing should happen when you log in as well as every 15 minutes.

I’ll keep exploring more Linux customizations and sharing what I learn. If this helped you, or sparked ideas for your own setup, I’d love to hear about it.