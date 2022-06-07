import React from 'react';
import { UserProps } from '../../utility/interface/props';
import GraphiQL from 'graphiql';
import './GraphiqlEditor.scss';
import 'graphiql/graphiql.min.css';

const link = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const query = `{
    _meta {
      deployment
      __typename
    }
  }`;
const GraphiqlEditor: React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  return (
    <>
      <div className="toolbarEditor">
        <GraphiQL
          fetcher={async (graphQLParams) => {
            const data = await fetch(link, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(graphQLParams),
              credentials: 'same-origin',
            });

            return data.json().catch(() => data.text());
          }}
          // readOnly={true}defaultVariableEditorOpen
          //sdangerouslyAssumeSchemaIsValid={true}
          //headerEditorEnabled={false}
          // beforeTopBarContent={<Logo width={'60px'} height={'50px'} />}
          editorTheme={'dracula'}
          readOnly={true}
          query={query}
        />
      </div>
    </>
  );
};

export default GraphiqlEditor;
