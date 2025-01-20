import SearchForm from '@/components/SearchForm'
import StartupCard, { StartupCardType } from '@/components/StartupCard'
import { sanityFetch, SanityLive } from '@/lib/live'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query
  // This ensures to revalidate this page whenever new changes are made
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY })

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

      <SanityLive />
    </>
  )
}
