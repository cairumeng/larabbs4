@extends('layouts.app')

@section('content')
<div id="posts-show-page" data-post="{{json_encode($post)}}" />
@stop