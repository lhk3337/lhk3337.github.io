const React = require("react");

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "myKeys",
      dangerouslySetInnerHTML: {
        __html: `
          (() => {    
            window.__onThemeChange = function() {};      

            function setTheme(newTheme) {                  
              window.__theme = newTheme;                  
              preferredTheme = newTheme;                  
              document.body.className = newTheme;
              document.body.dataset.theme = newTheme;                 
              window.__onThemeChange(newTheme);                
            }

            let preferredTheme

            try {
              preferredTheme = localStorage.getItem('theme')
            } catch (err) {}

            window.__setPreferredTheme = newTheme => {
              setTheme(newTheme)

              try {
                localStorage.setItem('theme', newTheme)
              } catch (err) {}
            }

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

            darkQuery.addEventListener('change', e => {
              window.__setPreferredTheme(e.matches ? 'dark' : 'light')
            })

            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
          })()
        `,
      },
    }),
  ]);
};
/* 
  현재 pc에 설정된 다크 모드 및 라이트 모드의 현재값을 localStorage 초기값으로 저장
  toggle 클릭 상태에 따라 body className에 dark 및 light로 변경, localStorage도 dark, light로 저장
  설정된 값은 useTheme의 useEffect에서 실행 된다.
*/
