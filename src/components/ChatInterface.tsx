import React, { useState, useRef, useEffect } from 'react';
import { Button } from './design-system/Button';
import { Input } from './design-system/Input';
import { Modal } from './design-system/Modal';
import { 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  FileText, 
  X, 
  Edit, 
  Trash2, 
  Check, 
  CheckCheck,
  Smartphone,
  Smile,
  Bold,
  Italic,
  Download,
  Copy
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'customer' | 'projectManager';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
  edited?: boolean;
  smsNotificationSent?: boolean;
  attachments?: Array<{
    id: number;
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
}

interface ChatInterfaceProps {
  currentUserRole: 'customer' | 'projectManager';
  caseId: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'projectManager',
    senderName: 'Ola Svendsen',
    message: 'Hei! Jeg er din prosjektleder for denne saken. Vi kommer på befaring i morgen kl. 10:00.',
    timestamp: '14. jan, 09:15',
    read: true,
    smsNotificationSent: true
  },
  {
    id: 2,
    sender: 'customer',
    senderName: 'Ola Nordmann',
    message: 'Takk for beskjed! Det passer fint. Kan jeg sende noen bilder av skaden nå?',
    timestamp: '14. jan, 09:30',
    read: true,
    smsNotificationSent: true
  },
  {
    id: 3,
    sender: 'projectManager',
    senderName: 'Ola Svendsen',
    message: 'Ja, gjerne send over bilder! Det vil hjelpe oss med forberedelsene.',
    timestamp: '14. jan, 09:32',
    read: true
  },
  {
    id: 4,
    sender: 'customer',
    senderName: 'Ola Nordmann',
    message: 'Her er bildene av badeskaden. Som dere ser er det ganske omfattende vannskade.',
    timestamp: '14. jan, 09:45',
    read: true,
    attachments: [
      { id: 1, name: 'bad_skade_1.jpg', type: 'image/jpeg', url: 'https://vcdn.polarismedia.no/573aa6fa-f1bb-445d-8d7a-cfd893c5fa45?fit=clip&q=80&tight=false&w=2000', size: 2400 },
      { id: 2, name: 'bad_skade_2.jpg', type: 'image/jpeg', url: 'https://mnd-assets.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_xy_center,q_auto:good,w_746,x_1608,y_1056/vjrtlejvcruxyhh1qxjh', size: 1850 }
    ]
  },
  {
    id: 5,
    sender: 'projectManager',
    senderName: 'Ola Svendsen',
    message: 'Takk for bildene. Vi tar med utstyr for tørking i tillegg til befaring i morgen.',
    timestamp: '14. jan, 10:00',
    read: false,
    edited: true
  }
];

export function ChatInterface({ currentUserRole, caseId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [textFormatting, setTextFormatting] = useState({ bold: false, italic: false });
  const [shouldScroll, setShouldScroll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);
  
  const commonEmojis = ['👍', '😊', '🎉', '✅', '❤️', '👏', '🔧', '🏠', '📞', '✔️'];
  
  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    let formattedMessage = newMessage;
    if (textFormatting.bold) formattedMessage = `**${formattedMessage}**`;
    if (textFormatting.italic) formattedMessage = `*${formattedMessage}*`;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: currentUserRole,
      senderName: currentUserRole === 'customer' ? 'Ola Nordmann' : 'Ola Svendsen',
      message: formattedMessage,
      timestamp: new Date().toLocaleString('no-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      read: false,
      smsNotificationSent: true,
      attachments: attachments.length > 0 ? attachments.map((file, idx) => ({
        id: idx + 1,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: Math.round(file.size / 1024)
      })) : undefined
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachments([]);
    setTextFormatting({ bold: false, italic: false });
    setShouldScroll(true);
  };
  
  const handleEditMessage = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setEditingMessageId(messageId);
      setEditText(message.message);
    }
  };
  
  const handleSaveEdit = () => {
    if (editingMessageId) {
      setMessages(messages.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, message: editText, edited: true }
          : msg
      ));
      setEditingMessageId(null);
      setEditText('');
    }
  };
  
  const handleDeleteMessage = () => {
    if (messageToDelete) {
      setMessages(messages.filter(msg => msg.id !== messageToDelete));
      setMessageToDelete(null);
      setShowDeleteModal(false);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleCopyMessage = (message: string) => {
    navigator.clipboard.writeText(message);
  };
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={16} />;
    return <FileText size={16} />;
  };
  
  const renderMessage = (msg: Message) => {
    const isOwnMessage = msg.sender === currentUserRole;
    const isEditing = editingMessageId === msg.id;
    
    // Parse formatting
    let displayMessage = msg.message;
    const isBold = displayMessage.startsWith('**') && displayMessage.endsWith('**');
    const isItalic = displayMessage.startsWith('*') && displayMessage.endsWith('*') && !isBold;
    if (isBold) displayMessage = displayMessage.slice(2, -2);
    if (isItalic) displayMessage = displayMessage.slice(1, -1);
    
    return (
      <div key={msg.id} className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 bg-[#a6c8ff] rounded-full flex items-center justify-center">
          <span className="text-[#016cb7]">
            {msg.sender === 'customer' ? 'K' : 'P'}
          </span>
        </div>
        
        {/* Message Content */}
        <div className={`flex flex-col gap-1 max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} group`}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#697077]">{msg.senderName}</span>
            {msg.smsNotificationSent && (
              <div className="flex items-center gap-1 text-xs text-[#0062ff]" title="SMS-varsel sendt">
                <Smartphone size={12} />
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="w-full space-y-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                fullWidth
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit}>Lagre</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingMessageId(null)}>
                  Avbryt
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`px-4 py-2.5 rounded-lg relative ${
                  isOwnMessage
                    ? 'bg-[#016cb7] text-white rounded-tr-none'
                    : 'bg-[#f4f4f4] text-[#21272a] rounded-tl-none'
                }`}
              >
                <p className={`text-sm whitespace-pre-wrap break-words ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}>
                  {displayMessage}
                </p>
                
                {/* Attachments */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {msg.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-2 bg-white/10 rounded p-2">
                        {attachment.type.startsWith('image/') ? (
                          <div className="w-full">
                            <img 
                              src={attachment.url} 
                              alt={attachment.name}
                              className="rounded max-h-64 w-full object-cover mb-1"
                            />
                            <div className="flex items-center justify-between text-xs">
                              <span className="truncate">{attachment.name}</span>
                              <button className="ml-2 hover:opacity-70 cursor-pointer">
                                <Download size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {getFileIcon(attachment.type)}
                            <span className="text-xs flex-1 truncate">{attachment.name}</span>
                            <span className="text-xs">{attachment.size} KB</span>
                            <button className="hover:opacity-70 cursor-pointer">
                              <Download size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Action buttons (show on hover for own messages) */}
                {isOwnMessage && (
                  <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white border border-[#dde1e6] rounded p-1 shadow-lg">
                    <button
                      onClick={() => handleCopyMessage(msg.message)}
                      className="p-1.5 hover:bg-[#f4f4f4] rounded transition-colors cursor-pointer"
                      title="Kopier"
                    >
                      <Copy size={14} className="text-[#697077]" />
                    </button>
                    <button
                      onClick={() => handleEditMessage(msg.id)}
                      className="p-1.5 hover:bg-[#f4f4f4] rounded transition-colors cursor-pointer"
                      title="Rediger"
                    >
                      <Edit size={14} className="text-[#016cb7]" />
                    </button>
                    <button
                      onClick={() => {
                        setMessageToDelete(msg.id);
                        setShowDeleteModal(true);
                      }}
                      className="p-1.5 hover:bg-[#ffd7d9] rounded transition-colors cursor-pointer"
                      title="Slett"
                    >
                      <Trash2 size={14} className="text-[#da1e28]" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Timestamp and read receipt */}
              <div className="flex items-center gap-2 text-xs text-[#697077] px-2">
                <span>{msg.timestamp}</span>
                {msg.edited && <span>(redigert)</span>}
                {isOwnMessage && (
                  msg.read ? (
                    <CheckCheck size={14} className="text-[#24a148]" title="Lest" />
                  ) : (
                    <Check size={14} className="text-[#697077]" title="Sendt" />
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-[#dde1e6]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#dde1e6]">
        <h4>Chat med {currentUserRole === 'customer' ? 'prosjektleder' : 'kunde'}</h4>
        <div className="mt-2 bg-[#e7efff] border border-[#0062ff] rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Smartphone size={16} className="text-[#0062ff] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-[#21272a]">
              <p className="mb-1">
                <strong>SMS-varsling er aktiv:</strong>
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-[#697077]">
                <li>Første melding sender SMS umiddelbart med lenke til saken</li>
                <li>Flere meldinger innen 1 time samles i én SMS-oppdatering</li>
                <li>Begge parter får automatisk SMS ved ny aktivitet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <div className="px-6 py-2 border-t border-[#dde1e6] bg-[#f4f4f4]">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#dde1e6]">
                {getFileIcon(file.type)}
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-[#da1e28] hover:bg-[#ffd7d9] p-1 rounded transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className="px-6 py-4 border-t border-[#dde1e6]">
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#dde1e6]">
          <button
            onClick={() => setTextFormatting({ ...textFormatting, bold: !textFormatting.bold })}
            className={`p-2 rounded transition-colors cursor-pointer ${
              textFormatting.bold ? 'bg-[#e7efff] text-[#016cb7]' : 'hover:bg-[#f4f4f4]'
            }`}
            title="Fet skrift"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => setTextFormatting({ ...textFormatting, italic: !textFormatting.italic })}
            className={`p-2 rounded transition-colors cursor-pointer ${
              textFormatting.italic ? 'bg-[#e7efff] text-[#016cb7]' : 'hover:bg-[#f4f4f4]'
            }`}
            title="Kursiv"
          >
            <Italic size={16} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 rounded hover:bg-[#f4f4f4] transition-colors cursor-pointer"
              title="Emoji"
            >
              <Smile size={16} />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-[#dde1e6] rounded-lg shadow-lg p-2 grid grid-cols-5 gap-1">
                {commonEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setNewMessage(newMessage + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-xl hover:bg-[#f4f4f4] rounded p-1 transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded hover:bg-[#f4f4f4] transition-colors cursor-pointer"
            title="Legg ved fil"
          >
            <Paperclip size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.pdf,.docx,.doc,.msg,.eml"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        
        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Skriv en melding..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            fullWidth
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            icon={<Send size={16} />}
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            Send
          </Button>
        </div>
        
        {/* SMS Notification Indicator */}
        {(newMessage.trim() || attachments.length > 0) && (
          <div className="mt-2 flex items-center gap-2 text-xs text-[#697077]">
            <Smartphone size={12} className="text-[#0062ff]" />
            <span>
              Mottaker vil få SMS-varsel med lenke til denne samtalen
            </span>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMessageToDelete(null);
        }}
        title="Slett melding"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Avbryt
            </Button>
            <Button onClick={handleDeleteMessage} icon={<Trash2 size={16} />}>
              Slett
            </Button>
          </>
        }
      >
        <p>Er du sikker på at du vil slette denne meldingen? Denne handlingen kan ikke angres.</p>
      </Modal>
    </div>
  );
}