<link rel="stylesheet" type="text/css" media="all" href="/public/font.css">
<div class="logo-container">
  <div class="logo"></div>
  <h1>Apollo<br>Foods</h1>
</div>
<style>
  .logo-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto 3rem;
  }
  .logo{
    width: 300px;
    height: 400px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  h1{
    font-family: 'Blatant';
    font-size: 96px;
    margin: 4rem 0 0 1rem;
    line-height: 100%;
    border: none;
  }
  @media (prefers-color-scheme: dark) {
    .logo-container {
      background: transparent;
    }
    .logo{
      background-image: url(images/Logo-White.svg);
    }
    h1{
      color: white;
    }
  }
  @media (prefers-color-scheme: light) {
    .logo-container {
      background: white;
    }
    .logo{
      background-image: url(images/Logo-Black.svg);
    }
    h1{
      color: black;
    }
  }
</style>

Apollo Foods is a random astronaut food recipe generator for your interstellar space missions. Each Pouch will be uniquely created for you. And uploaded to a 3D-Pouch Model.

Website: [apollo-foods.vercel.app](https://apollo-foods.vercel.app)
