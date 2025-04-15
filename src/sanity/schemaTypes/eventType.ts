import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Matches & Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Match Title',
      type: 'string',
      description: 'e.g. "Celtic vs. Rangers"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isWatchParty',
      title: 'Is Watch Party',
      type: 'boolean',
      initialValue: true,
      description: 'If checked, will show as "Watch Party" instead of time',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'venue' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      isWatchParty: 'isWatchParty',
    },
    prepare({ title, date, isWatchParty }) {
      const datetime = new Date(date)
      const formattedDate = datetime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      return {
        title: title,
        subtitle: `${formattedDate} - ${isWatchParty ? 'Watch Party' : datetime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        })}`,
      }
    },
  },
}) 