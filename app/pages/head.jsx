import store from "./store";

const me = this;
function _head (){
    return (
        <head>
            {this !== me && !!this?.data?.children ? this.data.children : ''}
            {store?.get('css')}
        </head>
    )
}

export default function Head (props){
    data = props;
    return _head.bind(porps);
}