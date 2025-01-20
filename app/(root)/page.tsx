import SearchForm from '@/components/SearchForm'
import StartupCard, { StartupCardType } from '@/components/StartupCard'
import { client } from '@/sanity/lib/client'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query

  const posts = await client.fetch(STARTUPS_QUERY)
  console.log(JSON.stringify(posts, null, 2))

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 100,
  //     author: { _id: 1, name: 'John Doe' },
  //     description: 'This is a description',
  //     image: 'https://placehold.co/300x200',
  //     category: 'Tech',
  //     title: 'Startup Name',
  //   },
  // ]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      {/* Section Container */}
      <section className="section_container">
        <p className="text-3-semibold">
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
