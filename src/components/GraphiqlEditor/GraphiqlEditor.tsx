import React, { useEffect } from 'react';
import { UserProps } from '../../utility/interface/props';
import GraphiQL from 'graphiql';
import './GraphiqlEditor.scss';
import 'graphiql/graphiql.min.css';
import Constants from '../../utility/constant';

const link = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

const buttonDisable = document.getElementsByClassName('toolbar-button');
 const GraphiqlEditor: React.FunctionComponent<UserProps> = ({ props }): JSX.Element => {
  useEffect(() => {
    if (buttonDisable && buttonDisable[3]) {
     
      let historyButton: HTMLElement = document.getElementsByClassName('toolbar-button')[3] as HTMLElement;
      let mergeButton: HTMLElement = document.getElementsByClassName('toolbar-button')[1] as HTMLElement;
      let docExplorerHide: HTMLElement = document.getElementsByClassName('docExplorerShow')[0] as HTMLElement;

      docExplorerHide.style.display='none';
      historyButton.style.display = 'none';
      mergeButton.style.display = 'none';
    }
  }, [props && props.loc]);

  return (
    <>
      <div className="graphiQLEditor">
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
          // beforeTopBarContent={<Logo width={'60px'} height={'50px'} />}
          editorTheme={'dracula'}
          readOnly={true}
          defaultVariableEditorOpen={false}
          defaultSecondaryEditorOpen={false}
          docExplorerOpen={false}
          headerEditorEnabled={false}
          query={props && props.loc ? props.loc.source.body : Constants.ERROR_MESSAGES.QUERY_ERROR}
        />
      </div>
    </>
  );
};

export default GraphiqlEditor;
