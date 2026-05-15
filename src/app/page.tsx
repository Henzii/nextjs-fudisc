/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "Find Weeklies Near You",
      description: "Discover all weekly tournaments happening near your location. You no longer have to travel to a course just to notice that it's full of towel slappers. With FuDisc's location-based weekly finder, you can browse upcoming events, check how busy they are, and plan your disc golf schedule accordingly.",
      image: null,
      imageRight: false,
      isPhone: true,
      addedAt: "2026-04-15T00:00:00.000Z",
    },
    {
      title: "Hole Maps Upload",
      description: "Take a photo of the hole map at your favorite course and upload it directly to FuDisc. Share detailed course information with the community and help other disc golfers navigate the course efficiently. Create a comprehensive map database that benefits every player.",
      image: null,
      imageRight: false,
      isPhone: true,
      addedAt: "2026-04-15T00:00:00.000Z",
    },
    {
      title: "Real-Time Multi-User Scorekeeping",
      description: "Elevate the disc golf experience with FuDisc's real-time multi-user scorekeeping functionality. Engage in collaborative play by inviting friends, fellow disc golfers, or competitors to join and keep score simultaneously. Witness the excitement as scores update in real-time, fostering a sense of camaraderie and competition among players. FuDisc redefines disc golf as a social sport, bringing players together for unforgettable rounds.",
      image: "/screenshot_frame_scorecard.png",
      imageRight: false,
      isPhone: true,
    },
    {
      title: "Unleash Your Potential with Handicap Score Calculations",
      description: "With FuDisc, you can unleash your true disc golf potential using our cutting-edge handicap score calculation feature. By factoring player skill levels and historical performance, FuDisc ensures fair and competitive matches for all players. Whether you're a seasoned pro or a beginner, FuDisc's handicap scoring guarantees exciting and balanced gameplay for everyone.",
      image: "/screenshot_frame_summary.png",
      imageRight: true,
      isPhone: true,
    },
    {
      title: "Raise a Toast with the Beer Handicap Feature",
      description: "FuDisc goes beyond scores, infusing your disc golf sessions with an extra dose of fun. Keep track of the number of beers enjoyed during each game and calculate the beer handicap for every player. Embrace the spirit of camaraderie, laughter, and friendly competition as you celebrate your disc golf achievements both on and off the course.",
      image: "/screenshot_frame_beer.png",
      imageRight: false,
      isPhone: true,
    },
    {
      title: "Elevating Disc Golf with Competitive Group Play",
      description: "FuDisc, the innovative disc golf app, stands out with its unique group creation and competition feature. Users can effortlessly set up custom groups for friendly matches, making every round of disc golf an engaging competition. Whether it's a small gathering or a full-blown tournament, FuDisc offers versatile scoring options and takes handicap scores into account. It allows disc golfers to track scores, compare performance, and foster camaraderie within the community, enhancing the disc golf experience.",
      image: "/competition_list.png",
      imageRight: true,
      isPhone: false,
    },
  ];

  const stats = [
    { value: "9000+", label: "Active Users" },
    { value: "4.33★", label: "Google Play Rating" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/backgroundImage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            The Best App for Disc Golfers
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-12 drop-shadow-md">
            Score keeping, statistics, and competition at your fingertips
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.henzisoft.puttmaster9000&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            className="inline-block transform hover:scale-105 transition-transform"
          >
            <img
              alt="Get it on Google Play"
              className="w-56 md:w-72 drop-shadow-xl"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-sky-200">
                Free scorekeeping for every disc golf round
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
                  FuDisc is built for disc golfers who want simple, reliable score tracking.
                </h2>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Welcome to FuDisc, the ultimate free scorekeeping app designed exclusively for
                  disc golf enthusiasts. Every round should be easy to score, compare, and
                  share—even when you&apos;re out on the course.
                </p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-700 bg-slate-950 p-8 shadow-xl shadow-slate-900/40">
              <h3 className="text-2xl font-semibold text-white mb-6">
                What makes FuDisc different?
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                  <span>Zero cost access to scorekeeping, stats, and group competition.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                  <span>Fast score entry and real-time updates for every player.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                  <span>Clean design that keeps the focus on your round and your results.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Wear OS Section */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                FuDisc Now on Wear OS!
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                Get ready to take your disc golf game to the next level with FuDisc on Wear
                OS - now you can keep track of your scores without ever having to fumble for your phone! That&apos;s right,
                the only thing you&apos;ll be juggling on the course are your discs. With FuDisc on your wrist, you can easily
                track your game, check stats, and look like a total pro without breaking your stride. It&apos;s like having a caddy,
                but without the awkward small talk. So go ahead, leave your phone in your bag, and keep your focus on throwing perfect
                shots - your wrist is all you need!
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img
                src="/wearos.jpg"
                alt="Wear OS App"
                className="w-72 h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-950">
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`w-full py-12 ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950'}`}>
              <div className="max-w-6xl mx-auto px-6">
                <div className={`grid gap-12 items-center ${feature.image ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} ${feature.imageRight ? "md:grid-cols-2" : ""}`}>
                  <div className={feature.imageRight && feature.image ? "order-2 md:order-2" : "order-1"}>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-3xl md:text-4xl font-bold text-white">
                        {feature.title}
                      </h3>
                      {feature.addedAt && Date.now() - new Date(feature.addedAt).getTime() < 1000 * 60 * 60 * 24 * 60 && (
                        <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950">
                          New feature
                        </span>
                      )}
                    </div>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {feature.image && (
                    <div className={`flex justify-center ${feature.imageRight ? "order-1 md:order-1" : "order-2"}`}>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className={`rounded-3xl shadow-2xl ${feature.isPhone ? "w-56" : "w-96"}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {stat.value}
                </div>
                <div className="text-xl text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400 mt-8">
            <p>* Over 9000+ users - Estimated user count, real user count may vary</p>
            <p>* 4,33 rating with a total of 3 reviews on Google Play</p>
          </div>
        </div>
      </section>

      {/* Cloud Storage Section */}
      <section className="py-20 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Seamless Cloud Storage
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Enjoy the convenience of seamless data access with FuDisc&apos;s cloud storage
            capability. Your scorekeeping data is securely stored in the cloud, allowing
            you to effortlessly access it from any device, whether you&apos;re on the course, at
            home, or on the move. Focus on perfecting your game while FuDisc takes care of
            preserving and organizing your valuable disc golf statistics.
          </p>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="py-10 px-6 bg-slate-900">
        <div className="max-w-3xl mx-auto rounded-3xl border border-slate-700 bg-slate-950 p-8 shadow-xl shadow-slate-900/40">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Supported languages
            </h3>
            <p className="text-base text-slate-300 mb-6">
              FuDisc supports these languages so more players can use the app in their native language.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { code: 'en', label: 'English' },
              { code: 'fi', label: 'Finnish' },
              { code: 'sv', label: 'Swedish' },
              { code: 'de', label: 'German' },
              { code: 'et', label: 'Estonian' },
              { code: 'pl', label: 'Polish' },
            ].map((lang) => (
              <span key={lang.code} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100">
                {lang.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Are you ready?
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed">
            Ready to revolutionize your disc golf experience? Embrace the power of
            FuDisc today. Download our app and unlock a world of unrivaled features,
            cloud storage convenience, and the ultimate scorekeeping companion—all at no cost.
            Join the thriving community of disc golfers who trust FuDisc for accurate scores,
            fair play, and endless enjoyment!
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.henzisoft.puttmaster9000&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            className="inline-block transform hover:scale-105 transition-transform"
          >
            <img
              alt="Get it on Google Play"
              className="w-56 md:w-72 drop-shadow-xl"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
