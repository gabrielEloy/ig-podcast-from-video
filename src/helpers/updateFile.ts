import getFileNameFromPath from './getFileNameFromPath'
import fs from 'fs'

export async function rename(originalPath) {
    const { file: oldFilename, extension } = getFileNameFromPath(originalPath);

    const newFilename = `${oldFilename.split('_')[1]}.${extension}`;
    const newFilePathArray = originalPath.split('/');
    newFilePathArray[newFilePathArray.length - 1] = newFilename;

    const newPath = newFilePathArray.join('/')

    new Promise((resolve, reject) => {
        fs.rename(originalPath, newPath, err => {
            if (err) reject(err);
            resolve(newPath)
        })
    })
}

export  async function deleteFile(path) {
    new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) reject(err)
            resolve(true)
        })
    })
}
