import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Route, Routes, Navigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return(
        <Home
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const MenuPage = () => {
      return(
        <Menu dishes={this.props.dishes} />
      );
    };

    const DishWithId = () => {
      let { dishId } =useParams();
      return(
        <DishDetail dish= {this.props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
         comments= {this.props.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
        />
      );
    };

    const AboutPage = () => {
      return(
        <About leaders = {this.props.leaders} />
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

export default (connect(mapStateToProps)(Main));
