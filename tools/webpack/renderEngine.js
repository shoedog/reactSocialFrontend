const {RoutingContext} = require('react-router');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const _renderComponents =  function(props){
    return ReactDOMServer.renderToString(
        <RoutingContext {...props} />
    );
};

module.exports = {

function(shouldRender, renderProps, indexHtml){
    return new Promise((resolve, reject) => {
        let output = shouldRender ? _renderComponents(renderProps) : '';
        resolve(
            render(indexHtml, {
                reactOutput: output
            })
        );
    });
}

};
