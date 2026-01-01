const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/upload');
const path = require('path');

// Single file upload route with error handling
router.post('/single', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            status: 'error',
            message: 'File too large. Maximum size is 10MB'
          });
        }
        return res.status(400).json({
          status: 'error',
          message: err.message
        });
      }
      // Handle other errors (like fileFilter errors)
      return res.status(400).json({
        status: 'error',
        message: err.message || 'File upload error'
      });
    }

    // If no error, proceed with handling the uploaded file
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    res.json({
      status: 'success',
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: `/uploads/documents/${req.file.filename}`,
        size: req.file.size
      }
    });
  });
});

// Multiple files upload route with error handling
router.post('/multiple', (req, res, next) => {
  upload.array('files', 10)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            status: 'error',
            message: 'File too large. Maximum size is 10MB'
          });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            status: 'error',
            message: 'Too many files. Maximum is 10 files'
          });
        }
        return res.status(400).json({
          status: 'error',
          message: err.message
        });
      }
      // Handle other errors (like fileFilter errors)
      return res.status(400).json({
        status: 'error',
        message: err.message || 'File upload error'
      });
    }

    // If no error, proceed with handling the uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No files uploaded'
      });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      path: `/uploads/documents/${file.filename}`,
      size: file.size
    }));

    res.json({
      status: 'success',
      message: 'Files uploaded successfully',
      files: files
    });
  });
});

module.exports = router;
