import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getServerSession } from "next-auth";

const MessagesPage = async () => {
  const session = await getServerSession();
  const userExists = await User.findOne({ email: session.user.email });

  if (!userExists.id) {
    throw new Error("User ID is required");
  }

  const readMessages = await Message.find({
    recipient: userExists.id,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userExists.id,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  //console.log(readMessages);
  //console.log(unreadMessages);

  const messages = [...unreadMessages, ...readMessages];

  //console.log(messages[0]);

  return (
    // <div>Holaaaaaa messages</div>
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4"> Your Messages </h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={JSON.parse(JSON.stringify(message))}
                ></MessageCard>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
