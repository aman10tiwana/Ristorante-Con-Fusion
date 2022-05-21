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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

class Main extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return(
        <Home
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
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
        <DishDetail dish= {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments= {this.props.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))}
          addComment= {this.props.addComment}
        />
      );
    };

    const AboutPage = () => {
      return(
        <About leaders = {this.props.leaders} />
      );
    };

    const ContactPage = () => {
      return(
        <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route exact path="/menu" element={<MenuPage />} />
              <Route path='/menu/:dishId' element={<DishWithId/>} />
              <Route path="/contactus" element={<ContactPage/>} />
              <Route path="/aboutus" element={<AboutPage/>} />
              <Route path="/*" element={<Navigate replace to="/home" />} />

        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
