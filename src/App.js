import React, { Component } from "react";
import { ContactForm } from "./Components/ContactForm";
import { ContactList } from "./Components/ContactList";
import { Filter } from "./Components/Filter";
import style from "./app.module.css";
import pop from "./Transition/pop.module.css";
import { connect } from "react-redux";
import contactsOperations from "./Redux/Operations/contactOperation";
import contactsSelectors from "./Redux/Selectors/contactSelectors";
import { CSSTransition } from "react-transition-group";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends Component {
  componentDidMount() {
    this.props.onFetchContacts();
  }

  render() {
    const { contacts, isLoadingContacts } = this.props;
    return (
      <div className={style.container}>
        <ContactForm />

        <CSSTransition
          in={contacts.length > 1}
          timeout={500}
          classNames={pop}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>
        {isLoadingContacts && (
          <div className={style.loader}>
            <CircularProgress />
          </div>
        )}
        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = {
  onFetchContacts: contactsOperations.fetchContacts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
