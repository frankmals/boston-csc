import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      initialValue: 'The Kinsale Pub',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      initialValue: '2 Genter Plaza',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'Boston',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Venue Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Direct link to venue on Google Maps',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}) 