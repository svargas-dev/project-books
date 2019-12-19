import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import { loadUserInformation as loadUserService } from "./../services/auth";
import { list as listBooks } from "./../services/books";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      books: []
    };
  }

  async componentDidMount() {
    const id = this.props.user._id;
    //console.log("id", id);
    try {
      const user = await loadUserService(id);
      const books = await listBooks();
      books.filter(book => book.seller === this.props.user._id);
      this.setState({
        books,
        user
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.state.user;
    let books = [];
    if (this.props.user) {
      books = this.state.books.filter(
        book => book.seller === this.props.user._id
      );
    } else {
      books = [...this.state.books];
    }
    console.log(books);
    //console.log(user.username);
    return (
      <div>
        <div className='container bootstrap snippets'>
          <div className='row'>
            <div className='col-xs-12 col-sm-9'>
              <form className='form-horizontal'>
                <div className='panel panel-default'>
                  <div className='panel-body text-center'>
                    <img
                      src=''
                      className='img-circle profile-avatar'
                      alt='User avatar'
                    />
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>User Name</h4>
                  </div>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>
                        {user.username}
                      </label>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>Location</h4>
                  </div>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <label className='col-sm-2 control-label'>
                        {user.location}
                      </label>
                    </div>
                  </div>
                </div>

                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>Email Adress</h4>
                  </div>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-sm-10'>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4 className='panel-title'>Books on Sale</h4>
                  </div>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div
                        className='col-sm-20'
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        {books.map(book => (
                          <Card
                            style={{
                              width: "14em",

                              padding: "1em"
                            }}
                            key={book._id}
                          >
                            <Card.Img variant='top' src={book.image} />
                            <Card.Body>
                              <Card.Title>{book.title}</Card.Title>
                              <Card.Text>{book.author}</Card.Text>
                              <Card.Text>{book.publishedYear}</Card.Text>
                              <Card.Text>
                                Listed on: {book.createdAt.slice(0, 10)}
                              </Card.Text>
                              <Button
                                variant='primary'
                                as={Link}
                                to={`/book/${book._id}`}
                              >
                                Buy
                              </Button>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='panel panel-default'>
                  <div className='panel-body'>
                    <div className='form-group'>
                      <div className='col-sm-10 col-sm-offset-2'>
                        <Link to={`/user/edit/${user._id}`}>Edit Profile</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;

/*         {user && (
            <div>
              <h1>{user.username}</h1>
              <h2>Email:</h2>
              <h3>{user.email}</h3>
              <h2>Location:</h2>
              <h3>{user.location}</h3>
              <h2>Coins:</h2>
              <h3>{user.coins}</h3>
              <h3>User Since:</h3>
              <Link to={`/user/edit/${user._id}`}>Edit Profile</Link>
            </div>
          )} */
