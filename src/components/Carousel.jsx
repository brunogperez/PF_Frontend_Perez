import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  'https://res.cloudinary.com/divujqlv8/image/upload/v1734112332/slide3_lv3b1d.webp',
  'https://res.cloudinary.com/divujqlv8/image/upload/v1734112332/slide1_ynoj7q.webp',
  'https://res.cloudinary.com/divujqlv8/image/upload/v1734112332/slide2_qenoqm.webp',
];

const variants = {
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '-100%' },
};

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1000);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ position: 'relative', alignContent: 'center', justifyContent: 'center' }}>
      <motion.div animate="enter" exit="exit" variants={variants} transition={{ duration: 0.5 }}>
        <img
          src={`${images[currentIndex]}`}
          alt="Imagen del carrusel"
          style={{
            height: 400,
            margin: 'auto',
            objectFit: 'contain',
            borderRadius: 30,
            marginBlock: 30,
          }}
        />
      </motion.div>
      <IconButton
        sx={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)', color: 'white' }}
        onClick={handlePrev}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        sx={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)', color: 'white' }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? 'black' : 'gray',
              margin: '4px',
            }}
          />
        ))}
      </div>
    </Box>
  );
};
