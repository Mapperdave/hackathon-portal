"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true,
})
exports.default = MLH

function MLH(options) {
  return {
    id: "mlh",
    name: "MLH",
    type: "oauth",
    authorization:
      "https://my.mlh.io/oauth/authorize?scope=email+phone_number+demographics+birthday+education",
    token: "https://my.mlh.io/oauth/token",
    userinfo: {
      url: "https://my.mlh.io/api/v3/user.json",
    },
    profile(profile) {
      return {
        id: profile.data.id,
        firstName: profile.data.first_name,
        lastName: profile.data.last_name,
        email: profile.data.email,
      }
    },
    options,
  }
}
