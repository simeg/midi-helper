#!/bin/bash

# Display an OS X notification with the song that's currently
# being played in your Spotify client.
#
# Requires terminal-notifier

command -v terminal-notifier >/dev/null 2>&1 ||
  { echo >&2 "Could not locate terminal-notifier. Exiting."; exit 1; }

readonly IS_SPOTIFY_RUNNING=$(
  ps ax \
    | grep "Spotify.app/Contents/MacOS/Spotify" \
    | wc -l
)

if [[ $IS_SPOTIFY_RUNNING -eq 2 ]]; then
  readonly NOW_PLAYING=$(/usr/bin/osascript ./spotify-current-track.scpt)
  echo $NOW_PLAYING;
  terminal-notifier -title "$NOW_PLAYING" -message '.. is the currently playing track';
fi

