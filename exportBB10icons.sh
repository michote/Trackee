#!/bin/bash

if [ $1 ] ; then
    echo "Source: " $1
    inkscape -w 480 -h 480 -e icon_480.png $1
    inkscape -w 144 -h 144 -e icon_144.png $1
    inkscape -w 110 -h 110 -e icon_110.png $1
    inkscape -w 96 -h 96 -e icon_96.png $1
    inkscape -w 90 -h 90 -e icon_90.png $1
    #inkscape -w 81 -h 81 -e icon_invoc_81.png $1
    #inkscape -i invoke -w 358 -h 358 -e icon_invoc_358.png $1
    #inkscape -i action -e icon_action.png $1
    inkscape -i splash -w 650 -h 650 -e splash.png $1
    convert splash.png -resize 50% -background "rgb(0,0,0)" -gravity center -extent 720x720 splash-720x720.png
    echo "create splash-720x720.png"
    convert splash.png -resize 65% -background "rgb(0,0,0)" -gravity center -extent 768x1280 splash-768x1280.png
    echo "create splash-768x1280.png"
    convert splash.png -resize 60% -background "rgb(0,0,0)" -gravity center -extent 720x1280 splash-720x1280.png
    echo "create splash-720x1280.png"
    convert splash.png -background "rgb(0,0,0)" -gravity center -extent 1440x1440 splash-1440x1440.png
    echo "create splash-1440x1440.png"
    rm splash.png
    echo "clean up"
else
    echo "Specify a file, e.g.: ./exportBB10icons.sh Icon.svg"
fi
