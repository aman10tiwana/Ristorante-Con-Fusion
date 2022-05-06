import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Route, Routes, Navigate, useParams} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {
    const HomePage = () => {
      return(
        <Home
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const MenuPage = () => {
      return(
        <Menu dishes={this.state.dishes} />
      );
    };

    const DishWithId = () => {
      let { dishId } =useParams();
      return(
        <DishDetail dish= {this.state.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
         comments= {this.state.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
        />
      );
    };

    const AboutPage = () => {
      return(
        <About leaders = {this.state.leaders} />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route exact path="/menu" element={<MenuPage />} />
              <Route path='/menu/:dishId' element={<DishWithId/>} />
              <Route path="/contactus" element={<Contact/>} />
              <Route path="/aboutus" element={<AboutPage/>} />
              <Route path="/*" element={<Navigate replace to="/home" />} />

        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;
