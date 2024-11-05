import { useState, useEffect, useRef } from 'react';
import { Canvas, useGLTF } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

// function Model({ modelPath, isRotating }) {
//     const { scene } = useGLTF(modelPath);
//     const modelRef = useRef();
//
//     useEffect(() => {
//         if (scene && isRotating) {
//             const animate = () => {
//                 scene.rotation.y += 0.005; // Rotate around the Y-axis
//                 requestAnimationFrame(animate);
//             };
//             animate();
//         }
//     }, [scene, isRotating]);
//
//     return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
// }

export function RoomPreview({ modelPath }) {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isRotating, setRotating] = useState(false);
    const controlsRef = useRef();

    const roomName = "ルーム名";

    const showPreview = () => {
        setOverlayVisible(true);
        setRotating(true);
    };

    const hideOverlay = () => {
        setOverlayVisible(false);
        setRotating(false);
    };

    return (
        <div className="RoomPreview">
            <div className="Center">
                <Button variant="contained"
                        sx={{ backgroundColor: '#ffffff', color: '#000000' }}
                        endIcon={<VisibilityIcon />}
                        onClick={showPreview}>
                    プレビュー
                </Button>
            </div>

            {isOverlayVisible && (
                <div className="overlay" onClick={hideOverlay}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="overlay-header">{roomName}</h2>
                        <Canvas style={{ width: '80%', height: '80%' }} camera={{ position: [0, 1.5, 4] }}>
                            <ambientLight />
                            <pointLight position={[10, 10, 10]} />
                            {/*<Model modelPath={modelPath} isRotating={isRotating} />*/}
                            <OrbitControls ref={controlsRef} target={[0, 1.5, 0]} />
                        </Canvas>
                        <Button variant="contained" sx={{ margin: '20px', backgroundColor: '#f30100', color: '#fff' }} endIcon={<CloseIcon />} onClick={hideOverlay}>閉じる</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
