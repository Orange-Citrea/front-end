/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import { MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
}

export function BackgroundAnimation() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const particleCount = 200; // Increased particle count
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1, // Slightly larger particles
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    return (
        <div
            className="fixed inset-0 -z-10 overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
        >
            {particles.map((particle) => (
                <ParticleAnimation
                    key={particle.id}
                    particle={particle}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}
            <GlowingOrb
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"
                animationProps={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transitionProps={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <GlowingOrb
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px]"
                animationProps={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transitionProps={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

interface ParticleAnimationProps {
    particle: Particle;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

function ParticleAnimation({
    particle,
    mouseX,
    mouseY,
}: ParticleAnimationProps) {
    const controls = useAnimation();

    useEffect(() => {
        controls.start((i) => {
            const x = (i % 3) * 100 - 50;
            const y = Math.floor(i / 3) * 100 - 50;
            return {
                x: [0, x, 0],
                y: [0, y, 0],
                opacity: [0.2, 0.8, 0.2],
                transition: {
                    duration: Math.random() * 5 + 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            };
        });
    }, [controls]);

    return (
        <motion.div
            className="absolute w-1 h-1 bg-purple-400/50 rounded-full"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
            }}
            animate={controls}
            custom={particle.id}
            whileHover={{ scale: 2 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        />
    );
}

interface GlowingOrbProps {
    className: string;
    animationProps: any;
    transitionProps: any;
}

function GlowingOrb({
    className,
    animationProps,
    transitionProps,
}: GlowingOrbProps) {
    return (
        <motion.div
            className={className}
            animate={animationProps}
            transition={transitionProps}
        />
    );
}
