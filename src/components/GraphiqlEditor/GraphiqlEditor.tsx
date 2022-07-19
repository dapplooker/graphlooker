import React, { useEffect } from 'react';
import { GraphiqlProps } from '../../utility/interface/props';
import GraphiQL from 'graphiql';
import './GraphiqlEditor.scss';
import 'graphiql/graphiql.min.css';
import Constants from '../../utility/constant';
import { useSelector } from 'react-redux';
import { EndpointState, ThemeState } from '../../utility/redux/state';

const buttonDisable = document.getElementsByClassName(
  'toolbar-button'
) as HTMLCollectionOf<HTMLElement>;


window.onload=function(){
 
  let viewQueryButon=document.getElementsByClassName("btn-view-query icons")[0]as HTMLInputElement;
 // viewQueryButon.click();
  viewQueryButon.addEventListener("click", function(e){
 
    if(document.getElementsByClassName("execute-button")[0]as HTMLInputElement)
   {
      let doc=document.getElementsByClassName("execute-button")[0]as HTMLInputElement;
      doc.click();
   }
   
   } )};





const GraphiqlEditor: React.FunctionComponent<GraphiqlProps> = ({
  props,
  drawerOpen,
}): JSX.Element => {

 



  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  let themecolor =
    theme == Constants.LABELS.commonLables.LIGHT_THEME_LABEL ? 'solarized light' : 'dracula';
  

  useEffect(() => {
    if (buttonDisable) {
     
      const arrayOfHTMlElements = Array.from(buttonDisable);
      arrayOfHTMlElements.map((hideElement, index) => {
        return index % 2 == 1 ? (hideElement.style.display = 'none') : hideElement;
      });
    }
  }, [props && props.loc]);

  useEffect(() => {
    let docExplorerHide: HTMLElement = document.getElementsByClassName(
      'docExplorerShow'
    )[0] as HTMLElement;
    let queryVariables: HTMLElement = document.getElementById(
      'secondary-editor-title'
    ) as HTMLElement;
    queryVariables.style.display = 'none';
    docExplorerHide.style.display = 'none';
  }, [props && props.loc]);

  return (
    <>
      <div className={drawerOpen ? 'graphiQLEditor' : 'graphiQLEditor-drawer-open'}>
        <GraphiQL
          fetcher={async (graphQLParams) => {
            const data = await fetch(endpoint, {
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
          query={props && props.loc ? props.loc.source.body : Constants.ERROR_MESSAGES.QUERY_ERROR}
          editorTheme={themecolor}
         // editorTheme={"dracula"}
          readOnly={true}
          defaultVariableEditorOpen={false}
          defaultSecondaryEditorOpen={false}
          headerEditorEnabled={false}
        />
      </div>
    </>
  );
};

export default GraphiqlEditor;
