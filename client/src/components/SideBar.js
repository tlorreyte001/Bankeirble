import React from 'react';
class SideBar extends React.Component {
 
  render() {
    return (
     <section className={"sideBar"}>
        <nav>
            <a href='home'><img src="./img/home.png" alt="logo" />Home</a>
            <a href='dashboard' class="active"><img src="./img/table.png" alt="logo" />Dashboard</a>
            <a href='formulaire'><img src="./img/forms.png" alt="logo" />Formulaire</a>
            <a href='#'><img src="./img/cubes.png" alt="logo" />Blockchain</a>
        </nav>
     </section>
    );
  }
}

export default SideBar;