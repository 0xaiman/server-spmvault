import multer from "multer";

// middleware topupload
export const uploadFirebase = multer({
    storage:multer.memoryStorage(),
    limits : {
        fileSize:  5 * 1024 * 1024 // limit file size to 5MB
    }
})