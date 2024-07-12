import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );
  const [messageId, setMessageId] = useState("");

  const handleDeleteRequest = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                      <Card key={element._id} className="grid gap-2">
                        <CardDescription className="text-slate-900">
                          <span className="font-bold mr-2 ml-2">
                            Sender Name:
                          </span>
                          {element.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-900">
                          <span className="font-bold mr-2 ml-2">Subject:</span>
                          {element.subject}
                        </CardDescription>
                        <CardDescription className="text-slate-900">
                          <span className="font-bold mr-2 ml-2">Message:</span>
                          {element.message}
                        </CardDescription>

                        <CardFooter className="justify-end">
                          {loading && messageId === element._id ? (
                            <SpecialLoadingButton
                              width={"w-32"}
                              content={"deleting"}
                            />
                          ) : (
                            <Button
                              className="w-32"
                              onClick={() => handleDeleteRequest(element._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader>No Messages Found!</CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
