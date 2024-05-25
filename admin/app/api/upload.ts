import nextConnect from 'next-connect';
import multer from 'multer';
import mongoose from 'mongoose';

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect.createRouter();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
    await mongoose.connect(process.env.MONGO_URI as string, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
    });
    console.log(req.file)
    /*
    const newImage = new Image({
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });

    try {
        const savedImage = await newImage.save();
        res.status(200).json({ message: 'Image uploaded successfully', imageId: savedImage._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    */
});

export const config = {
    api: {
        bodyParser: false // Disabling bodyParser allows multer to handle multipart/form-data
    }
};

export default handler;