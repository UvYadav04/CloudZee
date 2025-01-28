const express = require('express')
const { createNewFolder, deleteFolder, renameFolder, openFolder } = require('../Controllers/Folder')
const folderRouter = express.Router()

folderRouter.post('/newfolder', createNewFolder)
folderRouter.delete('/', deleteFolder)
folderRouter.patch('/', renameFolder)
folderRouter.post('/openFolder', openFolder)
module.exports = folderRouter