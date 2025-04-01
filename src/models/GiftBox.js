import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function GiftBox(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF('/gift_box.glb');

    useFrame((state) => {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                geometry={nodes.GiftBox.geometry}
                material={materials.GiftBoxMaterial}
                position={[0, 0, 0]}
            />
            <mesh
                geometry={nodes.Lid.geometry}
                material={materials.LidMaterial}
                position={[0, 0.5, 0]}
            />
        </group>
    );
}

useGLTF.preload('/gift_box.glb'); 