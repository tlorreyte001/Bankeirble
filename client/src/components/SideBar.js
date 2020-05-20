import React from 'react';
class SideBar extends React.Component {
 
  render() {
    return (
     <section className={"sideBar"}>
        <nav>
            <a href='home'><img src="./img/home.png" alt="logo" />Home</a>
            
            <a href='blockchain'><img src="./img/cubes.png" alt="logo" />Blockchain</a>
        </nav>
     </section>
    );
  }
}

export default SideBar;