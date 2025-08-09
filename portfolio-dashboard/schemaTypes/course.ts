import {defineField, defineType} from 'sanity'

// Define supporting types
export const videoType = defineType({
  name: 'courseVideo',
  title: 'Course Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['http', 'https']})
          .error('Please enter a valid URL starting with http:// or https://'),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
    },
  },
})

export const resourceType = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({scheme: ['http', 'https']})
          .error('Please enter a valid URL starting with http:// or https://'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Video', value: 'video'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Code', value: 'code'},
          {title: 'Documentation', value: 'documentation'},
          {title: 'Tool', value: 'tool'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})

export const weekType = defineType({
  name: 'week',
  title: 'Week',
  type: 'object',
  fields: [
    defineField({
      name: 'weekNumber',
      title: 'Week Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(52),
    }),
    defineField({
      name: 'title',
      title: 'Week Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(1).error('At least one topic is required'),
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{type: 'courseVideo'}],
      description: 'Videos specific to this week',
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Lesson Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Lesson Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
      description: 'Lessons specific to this week',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'weekNumber',
    },
    prepare({title, subtitle}) {
      return {
        title: `Week ${subtitle}: ${title}`,
      }
    },
  },
})

export const courseType = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().min(100).max(1000),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "8 weeks", "3 months", "40 hours"',
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lessons',
      title: 'Number of Lessons',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Development', value: 'web-development'},
          {title: 'Mobile Development', value: 'mobile-development'},
          {title: 'Data Science', value: 'data-science'},
          {title: 'Machine Learning', value: 'machine-learning'},
          {title: 'Design', value: 'design'},
          {title: 'Business', value: 'business'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Cybersecurity', value: 'cybersecurity'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{type: 'courseVideo'}],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Prerequisites for taking this course',
    }),
    defineField({
      name: 'whatYouWillLearn',
      title: 'What You Will Learn',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.min(3).max(10),
    }),
    defineField({
      name: 'weeklySchedule',
      title: 'Weekly Schedule',
      type: 'array',
      of: [{type: 'week'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Course',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this course as featured',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor',
      media: 'thumbnail',
      isPublished: 'isPublished',
    },
    prepare({title, subtitle, media, isPublished}) {
      return {
        title: `${title} ${!isPublished ? '(Draft)' : ''}`,
        subtitle: `by ${subtitle}`,
        media,
      }
    },
  },
})
