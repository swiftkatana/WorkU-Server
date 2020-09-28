import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';


import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard'

const App =()=>{

    return (
        <div className="ui comments">
         <ApprovalCard >
         <CommentDetail  author="michael" timecreate="create at 5:00 "  image={faker.image.avatar() }content="hey man"/>
         </ApprovalCard>
         <ApprovalCard >
              <CommentDetail  author="bar" timecreate="create at  6:00" image={faker.image.avatar() }content=" what doo you thick"/>
         </ApprovalCard>
         <ApprovalCard >
        <CommentDetail author="daniel"  timecreate="create at 4:00 "  image={faker.image.avatar()}content="wtf!!!" />

         </ApprovalCard>
        </div>
    );
}



ReactDOM.render(<App /> , document.querySelector('#root'))