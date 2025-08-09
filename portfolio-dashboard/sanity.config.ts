import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// import {schemaTypes} from './schemaTypes'
import {courseType, resourceType, videoType, weekType} from './schemaTypes/course'
import {projectsType} from './schemaTypes/project'

export default defineConfig({
  name: 'default',
  title: 'portfolio-dashboard',

  projectId: 'gfee6st5',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [videoType, resourceType, weekType, courseType, projectsType],
  },
})
