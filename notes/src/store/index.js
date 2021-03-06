/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { Folder } from '../api/user'
import { File } from '../api/file'
import { Note } from '../api/notes'
import { FolderV } from '../api/foldernotefile'
import createLogger from 'vuex/dist/logger'

import auth from './reg/auth'
import signup from './reg/signup'

import {
  ADD_NOTE,
  REMOVE_NOTE,
  SET_NOTES,
  ADD_FOLDER,
  REMOVE_FOLDER,
  SET_FOLDERS,
  ADD_FILE,
  REMOVE_FILE,
  SET_FILES,
  SET_FOLDERV
} from './notes/mutation-types.js'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

const state = {
  folderss: [],
  user: []
}

const initialState = {
  folderss: [],
  user: []
}

const getters = {
  folderss: state => state.folderss,
  user: state => state.user
}

const mutations = {

  [ADD_NOTE] (state, note) {
    state.notes = [note, ...state.notes]
  },

  [ADD_FOLDER] (state, folder) {
    state.folderss = [folder, ...state.folderss]
  },

  [ADD_FILE] (state, file) {
    state.files = [file, ...state.files]
  },


  [REMOVE_NOTE] (state, { id }) {
    state.notes = state.notes.filter(note => {
      return note.id !== id
    })
  },

  [REMOVE_FOLDER] (state, { id }) {
    state.folderss = state.folderss.filter(folder => {
      return folder.id !== id
    })
  },

  [REMOVE_FILE] (state, { id }) {
    state.files = state.files.filter(file => {
      return files.id !== id
    })
  },

  [SET_NOTES] (state, { notes }) {
    state.notes = notes
  },

  [SET_FOLDERS] (state, { folderss }) {
    state.folderss = folderss
  },

  [SET_FOLDERV] (state, { user }) {
    state.user = user
  },

  [SET_FILES] (state, { files }) {
    state.files = files
  }
}

const actions = {
  createNote ({ commit }, noteData) {
    Note.create(noteData).then(note => {
      commit(ADD_NOTE, note)
    })
  },
  getNotes ({ commit }) {
    Note.list().then(notes => {
      commit(SET_NOTES, { notes })
    })
  },
  createFolder ({ commit }, folderData) {
    Folder.create(folderData).then(folder => {
      commit(ADD_FOLDER, folder)
    })
  },
  deleteFolder ({ commit }, folder) {
    Folder.delete(folder).then(response => {
      commit(REMOVE_FOLDER, folder)
    })
  },
  getFolders ({ commit }, folder) {
    Folder.list(folder).then(folderss => {
      commit(SET_FOLDERS, { folderss })
    })
  },
  getFolderV ({ commit }, username) {
    FolderV.list(username).then(user => {
      commit(SET_FOLDERV, { user })
    })
  },
  createFile ({ commit }, fileData) {
    File.create(fileData).then(file => {
      commit(ADD_FILE, file)
    })
  },
  getFiles ({ commit }) {
    File.list().then(files => {
      commit(SET_FILES, { files })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
  auth,
  signup
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});