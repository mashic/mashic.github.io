# Computer Vision / 3VisionD - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
Suite of 4 interconnected computer vision applications for real-time object detection, tracking, and geospatial analysis from video surveillance systems. Integrates with Milestone XProtect video management platform.

**Tech Stack**: C# .NET Framework 4.8/4.7.2 | Windows Forms | OpenCvSharp4 (OpenCV wrapper) | Milestone XProtect SDK | UDP Networking | WGS84/ECEF Geospatial Math

**Your Role**: Assigned as developer to use OpenCV and create object tracking. Analyze the other projects (3VD_VisualProcessor, GeoCam plugin).

---

## 2. WHAT EACH PROJECT DOES

### 3VD_VisualProcessor (Main Desktop App)
Multi-camera video processor with real-time object detection and event generation.
**Pipeline**: Video Feed → MOG2 Background Subtraction → Gaussian Blur → Threshold → Dilation → Contour Detection → Shadow Filter → Contour Merging → Euclidean Distance Tracking → Pix2Geo Conversion → Event Emission

### 3VD_XProtectPlugin/GeoCam
XProtect integration providing geospatial mapping, PTZ (Pan-Tilt-Zoom) control, and lens distortion correction.
**Key Algorithm**: Pix2Geo converts pixel coordinates to GPS (lat/lon) using camera intrinsic parameters and ECEF coordinate system.

### ObjectTracking (Your Project - Standalone)
Lightweight video processor for local video files with frame-by-frame visualization.
MOG2 background subtraction → Morphological filtering → Contour extraction → Euclidean distance tracking with 500ms grace period.

### OpenCvSharpObjectTracking (Console Tool)
Automated video processing with advanced filtering: Hough Line Detection, Histogram Equalization, Division Normalization, HSV color processing, Gamma Correction.

---

## 3. TRACKING ALGORITHMS IMPLEMENTED

### Euclidean Distance Matching
$$d = \sqrt{(cx_1 - cx_2)^2 + (cy_1 - cy_2)^2} < threshold$$

- Threshold: 50-100 pixels depending on implementation
- Temporal persistence: Track objects across frames with ID assignment
- Grace period: 500ms-2000ms before track termination
- Alternative (commented out): GPS-based tracking using Haversine distance ($< 2.5m$)

### Pix2Geo Algorithm
Converts image pixel $(x,y)$ to GPS coordinates $(lat,lon)$ using:
- Camera intrinsics: HFoV, VFoV, mounting height, tilt angle
- Two reference GPS calibration points
- ECEF (Earth-Centered, Earth-Fixed) conversion on WGS84 ellipsoid

---

## 4. INTERVIEW STORIES (STAR)

### Story 1: Real-Time Object Tracking with OpenCV
**S**: Security monitoring system needed automated object detection and tracking across surveillance cameras
**T**: Build object detection and tracking using OpenCV in C# for real-time video feeds
**A**: Implemented MOG2 background subtraction for foreground detection, morphological operations (erode/dilate) for noise reduction, contour analysis for object identification, and Euclidean distance matching for frame-to-frame object persistence. Added configurable area thresholds and temporal grace periods
**R**: System tracked moving objects in real-time with persistent IDs. Used in production surveillance environment on Milestone XProtect platform

### Story 2: Pixel-to-GPS Coordinate Conversion
**S**: Surveillance system needed to know the real-world GPS location of detected objects
**T**: Convert pixel coordinates from camera images to GPS coordinates
**A**: Implemented Pix2Geo algorithm using camera calibration parameters (field of view, height, tilt angle) and ECEF coordinate system based on WGS84 ellipsoid. Used two GPS reference points for calibration
**R**: Detected objects displayed on map with GPS locations. Enabled automatic PTZ camera control toward targets using bearing calculations

---

## 5. WHAT TO SAY IN INTERVIEWS
"I worked on a computer vision project integrating OpenCV with C# for real-time surveillance object tracking. My specific contribution was the object tracking module using Euclidean distance matching for object persistence across video frames. The most interesting technical challenge was the geospatial component — converting pixel coordinates to GPS using camera calibration and ECEF math on the WGS84 ellipsoid. I analyzed the full system including the Milestone XProtect plugin, PTZ automation, and lens distortion correction modules."

**Key differentiation**: This project shows you can work beyond typical web dev — computer vision, geospatial math, real-time processing.

---

## 6. TECHNICAL DEPTH FOR INTERVIEWS

**Q: How does MOG2 background subtraction work?**
"MOG2 models each pixel as a Mixture of Gaussians. It learns the background model over time and identifies foreground objects by pixels that don't fit the model. Configurable parameters: history (how many frames to learn from), variance threshold (how different a pixel must be to be foreground)."

**Q: Why Euclidean distance for tracking vs other approaches?**
"Euclidean distance is computationally cheap and effective for simple scenarios. For more robust tracking, you'd use Kalman filters (predict where objects will be), Hungarian algorithm (optimal assignment), or deep learning approaches like SORT/DeepSORT. We used Euclidean because the surveillance scenarios had limited object density."

**Q: What's the ECEF coordinate system?**
"Earth-Centered, Earth-Fixed — a 3D Cartesian coordinate system where the origin is Earth's center. We used it as an intermediate step between camera coordinates and geodetic coordinates (lat/lon/alt). The WGS84 ellipsoid defines Earth's shape for the conversion."
