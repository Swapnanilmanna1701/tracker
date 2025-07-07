import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  originalSize: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 6000));
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: size,
          originalSize: size,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.6 ? '#8B5CF6' : Math.random() > 0.3 ? '#003153' : '#06B6D4'
        });
      }
      particlesRef.current = particles;
    };

    const updateParticles = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach(particle => {
        // Mouse attraction and size effect
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          particle.vx += (dx / distance) * force * 0.008;
          particle.vy += (dy / distance) * force * 0.008;
          
          // Increase size when near mouse
          particle.size = particle.originalSize * (1 + force * 0.8);
          particle.opacity = Math.min(1, particle.opacity + force * 0.3);
        } else {
          // Return to original size
          particle.size = particle.originalSize;
          particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.7;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.7;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Friction
        particle.vx *= 0.995;
        particle.vy *= 0.995;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const opacity = (80 - distance) / 80 * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Draw dot particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        if (particle.color === '#8B5CF6') {
          gradient.addColorStop(0, `rgba(139, 92, 246, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);
        } else if (particle.color === '#003153') {
          gradient.addColorStop(0, `rgba(0, 49, 83, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(0, 49, 83, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(6, 182, 212, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;