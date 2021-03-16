function getFileNameFromPath(filePath){
    
    const splittedSource = filePath.split('/');
    
    const [file, extension] = splittedSource[splittedSource.length - 1]
    .split('.')

    return {file, extension}
}

export default getFileNameFromPath