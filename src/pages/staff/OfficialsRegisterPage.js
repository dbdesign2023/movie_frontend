import React from "react";

export default function OfficialsRegisterPage() {
  return (
    <form>
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="inputGroupFile01"/>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
    </form>
  );
}