# Puzzle Frame Calculator

A simple calculator for determining which modular 3D-printed frame pieces to print for a puzzle of any size.

Built as part of **Ideasian** — small tools for ideas that needed somewhere to go.

## Try It

**https://frame.ideasian.com**

## What It Does

Enter your puzzle's width and height in inches or millimeters.

The calculator:

- Converts inches to millimeters automatically
- Accounts for the frame's 100 mm corner pieces
- Finds a combination of available straight frame sections
- Prefers the closest fit without making the frame too small
- Prefers fewer pieces when multiple combinations fit equally well
- Calculates how many of each piece to print
- Shows the finished frame dimensions
- Shows any extra clearance
- Warns when a puzzle is outside the documented limits of the frame system

## Supported Frame Pieces

This calculator is designed for the modular puzzle frame available on MakerWorld:

**https://makerworld.com/models/3183195**

### Corner Pieces

- 100 mm corners
- 4 corners required per frame
- Together, the corners account for 200 mm of each overall frame dimension

### Available Straight Sections

50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 170, 180, 200, 210, 220, 230, 240, and 250 mm.

The original model notes that 160 mm and 190 mm pieces are currently unavailable due to an issue with the CAD file.

## Frame Limitations

According to the frame model's documentation:

- Minimum puzzle size: approximately **200 × 200 mm**
- Maximum puzzle thickness: approximately **3 mm**
- Portrait, landscape, and square puzzles are supported
- Large frames should theoretically be possible, but large sizes have not been fully tested

The calculator may therefore warn about unusually large dimensions rather than preventing them.

## Example

For a 24 × 18 inch puzzle:

- Puzzle dimensions: 609.6 × 457.2 mm
- Horizontal straight sections: 200 + 210 mm
- Vertical straight sections: 130 + 130 mm
- Finished frame: approximately 610 × 460 mm

## About the Frame Design

This calculator does **not** include the 3D model files.

The printable frame pieces were designed and published separately on MakerWorld. Download the original model and review its printing and assembly instructions here:

https://makerworld.com/models/3183195

All rights and licensing for the 3D model remain with its original creator.

This repository contains only the independent calculator used to determine which frame-piece sizes are needed.

## About Ideasian

**Ideasian** is a home for small tools, experiments, and random ideas made useful.

https://ideasian.com

## License

The calculator source code is available under the MIT License.

The MIT License applies only to the code in this repository. It does not apply to the linked MakerWorld model or any files created by its designer.
