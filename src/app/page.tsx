"use client";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export default function Home() {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);
  const [isExtendedMenuCollapsed, setIsExtendedMenuCollapsed] = useState(true);
  const [isWidgetOpened, setIsWidgetOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse extended menu on mobile resize
      if (mobile && !isExtendedMenuCollapsed) {
        setIsExtendedMenuCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExtendedMenuCollapsed, isWidgetOpened]);
  const toggleIsSidebarCollapsed = () => {
    setIsSideBarCollapsed((prev) => !prev);
  };
  const toggleIsExtendedMenuCollapsed = () => {
    setIsExtendedMenuCollapsed((prev) => !prev);
  };
  const toggleWidget = () => {
    setIsWidgetOpened((prev) => !prev);
  };
  return (
    <main
      className={`w-full h-full ${
        isMobile ? "grid grid-cols-[1fr]" : "grid grid-cols-[auto_auto_1fr]"
      }`}
    >
      {/* Sidebar */}
      {!isMobile && (
        <aside
          style={{ width: isSideBarCollapsed ? "55px" : "240px" }}
          className="bg-red-300 h-full overflow-hidden transition-[width] duration-500 ease-in-out"
        >
          <header className="h-12 bg-amber-300 flex items-center gap-2 px-2">
            <span>Logo</span>
            <h1
              className={`${
                isSideBarCollapsed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            >
              Spire
            </h1>
          </header>
          <nav className="h-[calc(100%-3rem)] overflow-y-auto bg-green-800 transition-all duration-1000 ease-out">
            <ul className="w-full">
              <li className="w-full h-7 bg-red-600 flex gap-4 px-2">
                <span>A</span>
                <button
                  className={`${
                    isSideBarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                >
                  New Chat
                </button>
              </li>
              <li className="w-full bg-red-400 flex gap-4 px-2">
                <span>B</span>
                <button
                  className={`${
                    isSideBarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                >
                  About
                </button>
              </li>
              <li className="w-full bg-red-300 flex gap-4 px-2">
                <span>C</span>
                <button
                  onClick={toggleIsExtendedMenuCollapsed}
                  className={`${
                    isSideBarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                >
                  Extended menu
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      )}
      {/* Extended Menu (Desktop only) */}
      {!isMobile && (
        <section
          style={{
            width: isExtendedMenuCollapsed ? "0px" : "380px",
          }}
          className="transition-[width] duration-500 max-h-screen ease-in-out overflow-hidden bg-purple-400"
        >
          <div
            className={`${
              isExtendedMenuCollapsed
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            } transition-opacity duration-500`}
          >
            <header className="flex justify-between items-center bg-purple-600 w-full p-2">
              <h2 className="text-lg font-bold">Extended Menu</h2>
              <button onClick={toggleIsExtendedMenuCollapsed}>X</button>
            </header>
            <div className="overflow-y-auto h-[calc(100vh-3rem)]">
              {/* Extended menu content */}
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <p key={index}>
                    Extended menu content here... Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Saepe reprehenderit ipsa nisi
                    laudantium animi. Quibusdam cum facere soluta ipsam fuga,
                    similique assumenda harum officiis! Quam blanditiis alias ab
                    doloribus neque.
                  </p>
                ))}
            </div>
          </div>
        </section>
      )}
      {/* Main Content */}
      <section className="bg-blue-500 h-full flex flex-col overflow-hidden">
        <header
          className={`${
            isMobile ? "w-full" : ""
          } h-12 bg-amber-500 flex items-center justify-between px-2`}
        >
          <div className="flex gap-2">
            {isMobile ? (
              <Sheet>
                <SheetTrigger>
                  <button>☰</button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] bg-red-300 p-0">
                  <SheetHeader className="px-4 pt-4 pb-2 border-b">
                    <SheetTitle className="text-lg font-bold">Spire</SheetTitle>
                  </SheetHeader>
                  <nav className="py-4 px-4 overflow-y-auto space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-white">
                        <span className="bg-black w-6 h-6 flex items-center justify-center rounded text-sm">
                          A
                        </span>
                        <button className="text-white">New Chat</button>
                      </li>
                      <li className="flex items-center gap-3 text-white">
                        <span className="bg-black w-6 h-6 flex items-center justify-center rounded text-sm">
                          B
                        </span>
                        <button className="text-white">About</button>
                      </li>
                      <li className="flex items-center gap-3 text-white">
                        {/* Mobile Extended Menu Trigger */}
                        <Sheet>
                          <SheetTrigger asChild>
                            <div className="flex items-center gap-3 w-full cursor-pointer">
                              <span className="bg-black w-6 h-6 flex items-center justify-center rounded text-sm">
                                C
                              </span>
                              <span className="text-white">Extended Menu</span>
                            </div>
                          </SheetTrigger>
                          <SheetContent
                            side="left"
                            className="w-screen bg-purple-400 p-0 border-none"
                          >
                            <SheetHeader className="h-12 flex justify-between items-center bg-purple-600 w-full p-2">
                              <SheetTitle className="text-lg font-bold text-white">
                                Extended Menu
                              </SheetTitle>
                              <SheetTrigger asChild>
                                <button className="text-white">X</button>
                              </SheetTrigger>
                            </SheetHeader>
                            <div className="overflow-y-auto h-[calc(100%-3rem)] p-4">
                              {/* Same content as in extended menu */}
                              {Array(20)
                                .fill(0)
                                .map((_, index) => (
                                  <p key={index} className="mb-4 text-sm">
                                    Extended menu content here... Lorem ipsum
                                    dolor sit amet consectetur adipisicing elit.
                                  </p>
                                ))}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </li>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <button onClick={toggleIsSidebarCollapsed}>X</button>
            )}
            <h2>Bot avatar</h2>
          </div>
          <div>User profile</div>
        </header>

        {/* Main chatbot box + widget extension */}
        <section className="bg-red-700 w-full flex-1 h-[calc(100%-48px)]">
          {/* Layout container - different structure for mobile vs desktop */}
          <div
            className={`h-full w-full ${
              !isMobile ? "grid grid-cols-[1fr_auto]" : ""
            }`}
          >
            {/* Chatbot */}
            <div className="bg-pink-600 h-full">
              <div className="w-full flex flex-col items-center py-2 px-4">
                <p className={`${isMobile ? "w-full" : "w-1/2"} mx-auto mb-4`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci suscipit vitae nam nesciunt sapiente facilis maiores
                  incidunt corporis rerum libero dolor impedit fugiat, aut
                  veritatis tempora. Iste maxime praesentium vel? check how well
                  u feel to take the exam tommroew
                </p>
                {/* Widget button */}
                <button
                  onClick={toggleWidget}
                  className="border-2 p-2 bg-purple-500 text-white"
                >
                  Open Widget
                </button>
              </div>
            </div>

            {/* Desktop Widget Panel */}
            {!isMobile && isWidgetOpened && (
              <div
                style={{ width: "450px" }}
                className="h-full flex flex-col bg-red-800 overflow-hidden"
              >
                <header className="flex-shrink-0 flex justify-between px-4 py-2 bg-red-900">
                  <h1 className="text-white font-bold">Widget</h1>
                  <button onClick={toggleWidget} className="text-white">
                    X close
                  </button>
                </header>

                <div className="flex-1 min-h-0 overflow-y-auto p-4">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Widget Content
                  </h2>
                  {Array(50)
                    .fill(0)
                    .map((_, i) => (
                      <p key={i} className="text-white mb-4">
                        This is widget content item #{i + 1}.
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </section>

      {/* Mobile Widget Implementation with Sheet */}
      {isMobile && (
        <Sheet open={isWidgetOpened} onOpenChange={setIsWidgetOpened}>
          <SheetContent
            side="bottom"
            className="h-[90vh] p-0 rounded-t-xl flex flex-col overflow-hidden"
          >
            <div className="flex-shrink-0 flex justify-between items-center px-4 py-3 bg-red-900">
              <h2 className="text-white font-bold">Widget</h2>
              <button
                onClick={() => setIsWidgetOpened(false)}
                className="text-white"
              >
                X close
              </button>
            </div>

            {/* Scroll container */}
            <div className="flex-1 overflow-y-auto bg-red-800">
              <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-4">
                  Widget Content
                </h2>
                {/* Widget content here - more paragraphs to test scrolling */}
                {Array(40)
                  .fill(0)
                  .map((_, i) => (
                    <p key={i} className="text-white mb-4">
                      This is mobile widget content item #{i + 1}. This would
                      display relevant information, tools, or interactive
                      elements related to the conversation. The content should
                      scroll properly when it exceeds the height of the
                      container.
                    </p>
                  ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </main>
  );
}
