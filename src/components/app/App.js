import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
// import {ComicsPage, SingleComicPage, Page404, MainPage} from '../pages';

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))
const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>

                    <Suspense fallback={<span>Loading...</span>}>
                        <Switch>

                            <Route exact path="/">
                                <MainPage/>
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                            <Route exact path="/comics/:comicId">
                                <SingleComicPage/>
                            </Route>
                            <Route path="*">
                                <Page404/>
                            </Route>
                        </Switch>

                    </Suspense>

                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;

// import {BrowserRouter, Route, Routes} from "react-router-dom";
//
// import AppHeader from "../appHeader/AppHeader";
//
// import {MainPage, ComicsPage} from '../pages';
//
//
// const App = () => {
//
//     return (
//         <BrowserRouter>
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<MainPage/>}/>
//                         <Route path="/comics" element={<ComicsPage/>}/>
//                     </Routes>
//                 </main>
//             </div>
//         </BrowserRouter>
//     )
// }
//
// export default App;