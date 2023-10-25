/* eslint-disable @next/next/no-img-element */
import ArticleBlock from "@/components/ArticleBlock";

export default function Home() {
  return (
    <div>
      <div className="bg-[url('/backgroundImage.jpg')] py-32 px-10 bg-cover lg:py-64">
        <div className="text-white font-bold text-4xl lg:text-7xl outlinedText text-center lg:text-left">The Best App for Disc Golfers</div>
        <a href='https://play.google.com/store/apps/details?id=com.henzisoft.puttmaster9000&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
          <img alt='Get it on Google Play' className="w-48 lg:w-72" src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>

      </div>
      <ArticleBlock header="FuDisc - Your Free Disc Golf Scorekeeping Companion">
        Welcome to FuDisc, the ultimate free scorekeeping app designed exclusively for
        disc golf enthusiasts. Unlike other apps, FuDisc provides a comprehensive set
        of features at absolutely no cost, empowering you to take your disc golf game
        to new heights.
      </ArticleBlock>
      <ArticleBlock header="Real-Time Multi-User Scorekeeping" image="/screenshot_frame_scorecard.png">
        Elevate the disc golf experience with FuDisc&apos;s real-time multi-user
        scorekeeping functionality. Engage in collaborative play by inviting
        friends, fellow disc golfers, or competitors to join and keep score
        simultaneously. Witness the excitement as scores update in real-time,
        fostering a sense of camaraderie and competition among players. FuDisc
        redefines disc golf as a social sport, bringing players together
        for unforgettable rounds.
      </ArticleBlock>
      <ArticleBlock header="Over 9000+ users" variant="black" className="text-center" smallText="*) Estimated user count, real user count may vary">
        With thousands of users, FuDisc is fastly becoming the most used app for Disc Golf score keeping
      </ArticleBlock>
      <ArticleBlock header="Unleash Your Potential with Handicap Score Calculations" image="/screenshot_frame_summary.png" imageRight>
        With FuDisc, you can unleash your true disc golf potential using our cutting-edge
        handicap score calculation feature. By factoring player skill
        levels and historical performance, FuDisc ensures fair and competitive matches for
        all players. Whether you&apos;re a seasoned pro or a beginner, FuDisc&apos;s
        handicap scoring guarantees exciting and balanced gameplay for everyone.
      </ArticleBlock>
      <ArticleBlock header="4,33 rating on Google Play*" variant="black" className="text-center" smallText="*) With a total of 3 reviews">
        FuDisc users have given an average rating of 4.33 stars on Google Play
      </ArticleBlock>
      <ArticleBlock header="Seamless cloud storage">
        Enjoy the convenience of seamless data access with FuDisc&apos;s cloud storage
        capability. Your scorekeeping data is securely stored in the cloud, allowing
        you to effortlessly access it from any device, whether you&apos;re on the course, at
        home, or on the move. Focus on perfecting your game while FuDisc takes care of
        preserving and organizing your valuable disc golf statistics.
      </ArticleBlock>
      <ArticleBlock header="Raise a Toast with the Beer Handicap Feature" image="/screenshot_frame_beer.png">
        FuDisc goes beyond scores, infusing your disc golf sessions with an extra
        dose of fun. Keep track of the number of beers enjoyed during each game and
        calculate the beer handicap for every player. Embrace the spirit of
        camaraderie, laughter, and friendly competition as you celebrate your disc
        golf achievements both on and off the course.
      </ArticleBlock>
      <ArticleBlock header="Elevating Disc Golf with Competitive Group Play" image="/competition_list.png" isPhoneImage={false}>
        FuDisc, the innovative disc golf app, stands out with its unique group creation and competition
        feature. Users can effortlessly set up custom groups for friendly matches, making every round of
        disc golf an engaging competition. Whether it&apos;s a small gathering or a full-blown tournament, FuDisc
        offers versatile scoring options and takes handicap scores into account. It allows disc golfers to track
        scores, compare performance, and foster camaraderie within the community, enhancing the disc golf experience.
      </ArticleBlock>

      <ArticleBlock header="Are you ready?">
        Ready to revolutionize your disc golf experience? Embrace the power of
        FuDisc today. Download our app and unlock a world of unrivaled features,
        cloud storage convenience, and the ultimate scorekeeping companion—all at no cost.
        Join the thriving community of disc golfers who trust FuDisc for accurate scores,
        fair play, and endless enjoyment!
      </ArticleBlock>
    </div>
  )
}
