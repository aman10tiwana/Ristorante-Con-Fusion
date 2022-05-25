import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Route, Routes, Navigate, useParams, useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))

});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return(
        <Home
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}

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
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    const AboutPage = () => {
      return(
        <About
        leaders = {this.props.leaders}
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess} />
      );
    };

    const ContactPage = () => {
      return(
        <Contact resetFeedbackForm={this.props.resetFeedbackForm}
         postFeedback={this.props.postFeedback} />
      );
    };

    const AnimatedSwitch = () => {
      const location = useLocation();
      return (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Routes location={location}>
                  <Route path="/home" element={<HomePage />} />
                  <Route exact path="/menu" element={<MenuPage />} />
                  <Route path='/menu/:dishId' element={<DishWithId/>} />
                  <Route path="/contactus" element={<ContactPage/>} />
                  <Route path="/aboutus" element={<AboutPage/>} />
                  <Route path="/*" element={<Navigate replace to="/home" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      );
    };

    return (
      <div>
        <Header />
        <AnimatedSwitch />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
