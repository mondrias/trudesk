/*     .                              .o8                     oooo   .o8                             "888                     `888 .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo   888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'   888    888      888   888  888   888  888ooo888 `"Y88b.   888888.   888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.   "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o ======================================================================== Created:    11/24/2016 Author:     Chris Brame **/var mongoose = require('mongoose');var _ = require('underscore');var COLLECTION = 'messages';var messageSchema = mongoose.Schema({    conversation: {type: mongoose.Schema.Types.ObjectId, required: true, index: true},    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'accounts', required: true, index: true},    body: {type: String, required: true}}, { timestamps: true });messageSchema.statics.getFullConversation = function(convoId, callback) {    return this.model(COLLECTION).find({ conversation: convoId })        .select('createdAt body owner')        .sort('-createdAt')        .populate({            path: 'owner',            select: '_id username fullname email image'        })        .exec(callback);};messageSchema.statics.getConversation = function(convoId, callback) {    return this.model(COLLECTION).find({ conversation: convoId })        .select('createdAt body owner')        .sort('-createdAt')        .populate({            path: 'owner',            select: '_id username fullname email image'        })        .exec(callback);};messageSchema.statics.getMostRecentMessage = function(convoId, callback) {    return this.model(COLLECTION).find({ conversation: convoId })        .sort('-createdAt')        .limit(1)        .populate({            path: 'owner',            select: '_id username fullname image'        })        .exec(callback);};module.exports = mongoose.model(COLLECTION, messageSchema);