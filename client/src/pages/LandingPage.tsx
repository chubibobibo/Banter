function LandingPage() {
  const landingImg = "../src/assets/landing-img.png";
  return (
    <div className='flex flex-col md:grid md:grid-cols-2 md:h-screen'>
      <section className='hidden md:flex bg-amber-400'>world</section>
      <section className='md:bg-blue-400 flex items-center'>
        <img src={landingImg} className='w-screen -mt-20' />
      </section>
    </div>
  );
}
export default LandingPage;
