import * as THREE from 'three';

export function createGiftBox() {
    // Make the box larger and more rectangular
    const boxGeometry = new THREE.BoxGeometry(3, 2, 3);
    const lidGeometry = new THREE.BoxGeometry(3.2, 0.4, 3.2);

    // Create a ribbon geometry
    const ribbonGeometryVertical = new THREE.BoxGeometry(0.3, 2, 0.3);
    const ribbonGeometryHorizontal = new THREE.BoxGeometry(3, 0.3, 0.3);

    // More vibrant materials with better shininess and metallic look
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xff69b4,
        shininess: 150,
        specular: 0xffffff,
        emissive: 0x330000,
        emissiveIntensity: 0.1
    });

    const lidMaterial = new THREE.MeshPhongMaterial({
        color: 0xff1493,
        shininess: 150,
        specular: 0xffffff,
        emissive: 0x330000,
        emissiveIntensity: 0.1
    });

    const ribbonMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        shininess: 200,
        specular: 0xffffff,
        emissive: 0x663300,
        emissiveIntensity: 0.2
    });

    // Create meshes
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    const ribbonVertical = new THREE.Mesh(ribbonGeometryVertical, ribbonMaterial);
    const ribbonHorizontal = new THREE.Mesh(ribbonGeometryHorizontal, ribbonMaterial);

    // Position elements
    lid.position.y = 1.2;
    ribbonVertical.position.y = 1;
    ribbonHorizontal.position.y = 1;

    // Create the bow with more detail
    const bowGeometry = new THREE.TorusGeometry(0.4, 0.15, 32, 64);
    const bow1 = new THREE.Mesh(bowGeometry, ribbonMaterial);
    const bow2 = new THREE.Mesh(bowGeometry, ribbonMaterial);
    const bow3 = new THREE.Mesh(bowGeometry, ribbonMaterial);

    bow1.position.set(0, 1.6, 0);
    bow2.position.set(0, 1.6, 0);
    bow3.position.set(0, 1.6, 0);

    bow1.rotation.y = Math.PI / 4;
    bow2.rotation.y = -Math.PI / 4;
    bow3.rotation.y = Math.PI / 2;

    // Add some sparkle to the box
    const sparkleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const sparkleMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 200,
        specular: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.5
    });

    const sparkles = [];
    for (let i = 0; i < 8; i++) {
        const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
        const angle = (i / 8) * Math.PI * 2;
        sparkle.position.set(
            Math.cos(angle) * 1.5,
            0.5 + Math.random() * 0.5,
            Math.sin(angle) * 1.5
        );
        sparkles.push(sparkle);
    }

    // Group everything
    const group = new THREE.Group();
    group.add(box);
    group.add(lid);
    group.add(ribbonVertical);
    group.add(ribbonHorizontal);
    group.add(bow1);
    group.add(bow2);
    group.add(bow3);
    sparkles.forEach(sparkle => group.add(sparkle));

    return group;
} 